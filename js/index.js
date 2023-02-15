"use strict";

document.addEventListener("DOMContentLoaded", async () => {
	const cardsWrapper = document.querySelector(".cards_wrapper"),
		html = document.querySelector("html"),
		toggleTheme = document.querySelector(".toggle_theme");

	const ApiUrl =
		"https://crm-s.com/api/v1/employees-short-list?global_company_name=Remote%20Helpers&start=0&length=100";

	let state = {
		cards: [],
	};

	// const statusName = "Available";
	// const positionName = "Lead Generation Manager";
	const positionName = "Video Editor";

	const specificPerson = (person) => {
		state.cards = state.cards.concat(
			person.filter(
				(el) =>
					el.position_name === positionName
			)
		);
	};

	async function getEmployees() {
		const res = await fetch(ApiUrl);
		const data = await res.json();
		console.log("All data >>> ", data.data);
		return specificPerson(data.data);
	}

	const employeeList = (cards) => {
		cardsWrapper.innerHTML = "";

		if (cards.length) {
			cards.forEach((card) => (cardsWrapper.innerHTML += createCard(card)));
		}
	};

	const createCard = (card) => `
    <div class="card">
      <div class="candidate_photo">
        <img src="${card.image_url}" />
        <p class="candidate_id">ID: ${card.employee_id}</p>
      </div>
      <h3 class="name">${card.short_name}</h3>
      <p class="position_name">${card.position_name}</p>
      <h3 class="price">${card.price}€/month</h3>
      <div class="skills">
        ${card.skills_string
			.split(",")
			.slice(0, 3)
			.map((item) => `<span class="current_skill">${item}</span>`)}
        ${card.skills_string.split(",").length > 3
			? `<span class="current_skill active_skill">
                + ${card.skills_string.split(",").length - 3}
               </span>`
			: ""
		}
      </div>
      <div class="view_profile_block">
        <span class="card_line"></span>
        <span class="view_profile">View profile</span>
        <span class="card_line"></span>
      </div>
    </div>
  `;

	// dark theme

	toggleTheme.addEventListener("click", () => {
		if (localStorage.getItem("theme") === "dark") {
			localStorage.setItem("theme", "light");
		} else {
			localStorage.setItem("theme", "dark");
		}
		addDarkTheme();
	});

	function addDarkTheme() {
		try {
			if (localStorage.getItem("theme") === "dark") {
				html.classList.add("dark");
				toggleTheme.textContent = "light_mode";
			} else {
				html.classList.remove("dark");
				toggleTheme.textContent = "dark_mode";
			}
		} catch { }
	}

	addDarkTheme();

	// custom select

	// const selectBtn = document.querySelector(".custom_select_btn"),
	// 	selectList = document.querySelector(".custom_list"),
	// 	selectListItem = document.querySelectorAll(".custom_list-item"),
	// 	hiddenInput = document.querySelector(".hidden_input");

	// selectBtn.addEventListener("click", () => {
	// 	selectList.classList.toggle("show_custom_list");
	// });

	// selectListItem.forEach((item) => {
	// 	item.addEventListener("click", () => {
	// 		selectBtn.innerText = item.innerText;
	// 		selectList.classList.remove("show_custom_list");
	// 		hiddenInput.value = item.dataset.value;
	// 	});
	// });

	// document.addEventListener("click", (e) => {
	// 	if (e.target !== selectBtn) {
	// 		selectList.classList.remove("show_custom_list");
	// 	}
	// });

	// document.addEventListener("keydown", (e) => {
	// 	if (e.key === "Escape") {
	// 		selectList.classList.remove("show_custom_list");
	// 	}
	// });

	await getEmployees();
	employeeList(state.cards);

	console.log("Response >>> ", state.cards);
});
