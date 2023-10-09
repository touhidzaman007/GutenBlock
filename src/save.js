/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { newData } = attributes;
	return (
		<div {...useBlockProps.save()}>
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
					{newData?.map((user) => (
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
