export default function getImagemFromPath(path: string) {
	return path.split("/").pop();
}
