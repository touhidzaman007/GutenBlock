/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { newData, align } = attributes;
	const alignmentClass = align != null ? "has-text-align-" + align : "";

	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((jsonData) => {
				setData(jsonData);
				setAttributes({ newData: jsonData });
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);
	return (
		<div className={alignmentClass} {...useBlockProps()}>
			<BlockControls>
				<AlignmentToolbar
					value={align}
					onChange={(newalign) => setAttributes({ align: newalign })}
				/>
			</BlockControls>
			<table id="users">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Userame</th>
						<th>Email</th>
						<th>Address</th>
						<th>Phone</th>
						<th>Website</th>
						<th>Company</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((user) => (
							<tr key={user.id}>
								<td>{user.id}</td>
								<td>{user.name}</td>
								<td>{user.username}</td>
								<td>{user.email}</td>
								<td>
									{/* {user.address.street} */}
									<table>
										<thead>
											<tr>
												<th>Street</th>
												<th>Suit</th>
												<th>City</th>
												<th>Zipcode</th>
												<th>Geo</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{user.address.street}</td>
												<td>{user.address.suite}</td>
												<td>{user.address.city}</td>
												<td>{user.address.zipcode}</td>
												<td>
													<table>
														<thead>
															<tr>
																<th>Lat</th>
																<th>Lang</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>{user.address.geo.lat}</td>
																<td>{user.address.geo.lng}</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td>{user.phone}</td>
								<td>{user.website}</td>
								<td>
									<table>
										<thead>
											<tr>
												<th>Name</th>
												<th>CatchPhrase</th>
												<th>BS</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>{user.company.name}</td>
												<td>{user.company.catchPhrase}</td>
												<td>{user.company.bs}</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
