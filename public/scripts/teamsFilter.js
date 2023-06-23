window.onload = function(){
    slideOne();
    slideTwo();
}
let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 1;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;
function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #23A6F0 ${percent1}% , #23A6F0 ${percent2}%, #dadae5 ${percent2}%)`;
}

const searchForm = document.querySelector('.search-bar form');
const searchInput = document.querySelector('.search-bar input');
const skillsList = document.querySelector('#skills-list');
const applyButton = document.querySelector('.apply button');

function searchSkills(event) {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const skills = skillsList.querySelectorAll('li');
    skills.forEach(skill => {
        if (skill.textContent.toLowerCase().includes(searchTerm)) {
            skill.style.display = '';
        } else {
            skill.style.display = 'none';
        }
    });
}

function applySkills(event) {
    event.preventDefault();
    const checkedSkills = Array.from(skillsList.querySelectorAll('input:checked'));
    const teams = document.querySelectorAll('.team');

    const minTeamSize = parseInt(sliderOne.value);
    const maxTeamSize = parseInt(sliderTwo.value);

    teams.forEach(team => {
        const teamSkills = Array.from(team.querySelectorAll('.skill'))
            .map(skill => skill.textContent);
        const teamSize = parseInt(team.querySelector('.members-count label').textContent);

        if (checkedSkills.every(skill => teamSkills.includes(skill.value)) && teamSize >= minTeamSize && teamSize <= maxTeamSize) {
            team.style.display = '';
        }
        else {
            team.style.display = 'none';
        }
    });
}


searchForm.addEventListener("input", searchSkills);
applyButton.addEventListener("click", applySkills);
