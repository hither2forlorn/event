import path from "path"
export const imageValidationExtensions = [
	"png",
	"jpg",
	"jpeg",
	"gif",
	"svg",
	"heic",
	"heif",
	"webp",
];
const foodPreference = {
	veg: "veg",
	nonVeg: "nonVeg",
	vegan: "vegan",
}
const attendingstate = {
	pending: 'pending',
	completed: 'completed'

}
const ROOT_PATH = path.join(__dirname);
export { ROOT_PATH, foodPreference, attendingstate };
