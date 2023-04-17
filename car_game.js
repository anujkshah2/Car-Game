// Get the car element
const car = document.getElementById("car");

// Set the initial position of the car
let positionX = 0;

// Move the car left and right with arrow keys
document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowLeft") {
		positionX -= 10;
	}
	else if (event.key === "ArrowRight") {
		positionX += 10;
	}
    else if (event.key === "ArrowDown") {
		positionX +=500;
    }
	car.style.left = positionX + "px";
});

// Move the other cars randomly
setInterval(() => {
	// Get all the other cars
	const otherCars = document.querySelectorAll(".other-car");

	// Move each other car down by a random amount
	otherCars.forEach((otherCar) => {
		otherCar.style.top = parseInt(otherCar.style.top) + Math.floor(Math.random() * 10) + "px";

		// If the other car goes off the bottom of the screen, reset its position
		if (parseInt(otherCar.style.top) > window.innerHeight) {
			otherCar.style.top = "-100px";
			otherCar.style.left = Math.floor(Math.random() * (window.innerWidth - otherCar.offsetWidth)) + "px";
		}

		 // Check for collisions between the other car and the player's car
		 if (collision(car, otherCar)) {
		 	alert("Game Over");
		 	location.reload();
		 }
	});
}, 100);

// Create new other cars every 2 seconds
setInterval(() => {
	// Create a new other car element
	const otherCar = document.createElement("div");
	otherCar.classList.add("other-car");
	otherCar.style.width = "50px";
	otherCar.style.height = "50px";
	otherCar.style.backgroundColor = "red";
	otherCar.style.position = "absolute";
	otherCar.style.top = "-100px";
	otherCar.style.left = Math.floor(Math.random() * (window.innerWidth - otherCar.offsetWidth)) + "px";
	document.body.appendChild(otherCar);
}, 2000);

// Check for collisions between two elements
function collision(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();

	return !(
		aRect.bottom < bRect.top ||
		aRect.top > bRect.bottom ||
		aRect.right < bRect.left ||
		aRect.left > bRect.right
	);
}
