// Initialize variables to store DOM elements and states
let gridContainer;
let gridItems;
let shuffleButton;
let sortButton;
let searchButton;
let searchClearButton;
let searchContent;
let searchContentOriginal;
let searchDialog;
let searchInput;
let closeDialog;

/* Event handler functions */

// Shuffle grid: trigger grid shuffling.
const handleShuffleClick = () => shuffleGrid();

// Sort grid: trigger grid sorting.
const handleSortClick = () => sortGrid();

// Refine grid: trigger grid refining.
const handleRefineClick = (key) => refineGrid(key);

// Open search dialog: show the dialog and blur the page.
const handleSearchClick = () => {
  searchDialog.showModal();
  toggleDialogPageBlur(true);
};

// Close search dialog: hide the dialog and remove the blur.
const handleCloseClick = () => {
  searchDialog.close();
  toggleDialogPageBlur(false);
};

// Clear search: reset the filter and clear the input.
const handleSearchClearClick = () => {
  filterGrid('');
  toggleClearButton();
  searchContent.innerHTML = searchContentOriginal;
  searchInput.value = '';
  searchButton.classList.remove('search--active');
};

// Filter grid: update grid items based on the search input.
const handleSearchInput = (e) => {
  const searchTerm = e.target.value;
  filterGrid(searchTerm);
  searchContent.innerHTML = searchTerm === '' ? searchContentOriginal : searchTerm;
  toggleClearButton(searchTerm);
  searchButton.classList.toggle('search--active', searchTerm !== '');
};

/* Initialize DOM elements and states */
let refineUk;
let refineUs;
let refineEconomic;
let refinePolitic;
let refineSoccer;
const initializeVariables = () => {
  gridContainer = document.querySelector('[data-grid]');
  gridItems = Array.from(gridContainer?.children || []);
  shuffleButton = document.querySelector('[data-shuffle]');

  refineUk = document.querySelector('[data-refineUk]');
  refineUs = document.querySelector('[data-refineUs]');
  refineEconomic = document.querySelector('[data-refineEconomic]');
  refinePolitic = document.querySelector('[data-refinePolitic]');
  refineSoccer = document.querySelector('[data-refineSoccer]');

  sortButton = document.querySelector('[data-sort]');
  searchButton = document.querySelector('[data-search]');
  searchClearButton = document.querySelector('[data-clear]');
  searchContent = searchButton?.querySelector('.oh__inner');
  searchContentOriginal = searchContent?.innerHTML || '';
  searchDialog = document.getElementById('search-dialog');
  searchInput = document.getElementById('search-input');
  closeDialog = document.getElementById('close-dialog');
};

/* Shuffle grid items randomly and update the container */
const shuffleGrid = () => {
  const shuffledItems = gridItems.sort(() => Math.random() - 0.5);
  if (gridContainer) {
    gridContainer.innerHTML = '';
    shuffledItems.forEach((item) => gridContainer.appendChild(item));
  }
};

/* Sort grid items alphabetically by 'data-nationality' */
const sortGrid = () => {
  const sortedItems = gridItems.sort((a, b) => {
    const nameA = a.getAttribute('data-nationality').toLowerCase();
    const nameB = b.getAttribute('data-nationality').toLowerCase();
    return nameA.localeCompare(nameB);
  });
  if (gridContainer) {
    gridContainer.innerHTML = '';
    sortedItems.forEach((item) => gridContainer.appendChild(item));
  }
};

/* Filter grid items according to 'data-nationality' or 'data-fields */
const refineGrid = (key) => {
  gridItems.forEach((item) => {
    const lowKey = key.toLowerCase();
    const nationality = item.getAttribute('data-nationality').toLowerCase();
    const fields = item.getAttribute('data-fields').map(field => field.toLowerCase());
    item.style.display =
        nationality.includes(lowKey)
        || fields.some(field => field.includes(lowKey))
            ? ''
            : 'none';
  });
};

/* Filter grid items based on the search input */
const filterGrid = (searchValue) => {
  const lowerCaseSearch = searchValue.toLowerCase();
  gridItems.forEach((item) => {
    const name = item.getAttribute('data-name').toLowerCase();
    const nationality = item.getAttribute('data-nationality').toLowerCase();
    const fields = item.getAttribute('data-fields').map(field => field.toLowerCase());
    item.style.display =
      name.includes(lowerCaseSearch)
      || nationality.includes(lowerCaseSearch)
      || fields.some(field => field.includes(lowerCaseSearch))
        ? ''
        : 'none';
  });
};

/* Toggle page blur when the search dialog is open or closed */
const toggleDialogPageBlur = (toggle) => {
  if (toggle) {
    document.body.classList.add('blurred');
  } else {
    document.body.classList.remove('blurred');
  }
};

/* Show or hide the clear button based on search input */
const toggleClearButton = (searchTerm = '') => {
  const isHidden = searchClearButton?.classList.contains('hidden');
  if (searchTerm === '' && !isHidden) {
    searchClearButton.classList.add('hidden');
  } else if (searchTerm !== '' && isHidden) {
    searchClearButton.classList.remove('hidden');
  }
};

/* Initialize event listeners and states */
const init = () => {
  initializeVariables();

  refineUk?.addEventListener('click', handleRefineClick('Uk'));
  refineUs?.addEventListener('click', handleRefineClick('Us'));
  refineEconomic?.addEventListener('click', handleRefineClick('Economic'));
  refinePolitic?.addEventListener('click', handleRefineClick('Politic'));
  refineSoccer?.addEventListener('click', handleRefineClick('Soccer'));

  shuffleButton?.addEventListener('click', handleShuffleClick);
  sortButton?.addEventListener('click', handleSortClick);
  searchButton?.addEventListener('click', handleSearchClick);
  closeDialog?.addEventListener('click', handleCloseClick);
  searchClearButton?.addEventListener('click', handleSearchClearClick);
  searchInput?.addEventListener('input', handleSearchInput);
  searchDialog?.addEventListener('close', () => toggleDialogPageBlur(false));
};

/* Cleanup event listeners and reset variables */
const cleanup = () => {

  refineUk?.addEventListener('click', handleRefineClick);
  refineUs?.addEventListener('click', handleRefineClick);
  refineEconomic?.addEventListener('click', handleRefineClick);
  refinePolitic?.addEventListener('click', handleRefineClick);
  refineSoccer?.addEventListener('click', handleRefineClick);

  shuffleButton?.removeEventListener('click', handleShuffleClick);
  sortButton?.removeEventListener('click', handleSortClick);
  searchButton?.removeEventListener('click', handleSearchClick);
  closeDialog?.removeEventListener('click', handleCloseClick);
  searchClearButton?.removeEventListener('click', handleSearchClearClick);
  searchInput?.removeEventListener('input', handleSearchInput);
  gridContainer = null;
  gridItems = [];
  shuffleButton = null;
  sortButton = null;
  searchButton = null;
  searchClearButton = null;
  searchContent = null;
  searchContentOriginal = '';
  searchDialog = null;
  searchInput = null;
  closeDialog = null;
};

/* Handle Astro page events on the home page */
const handlePageEvent = (type) => {
  const page = document.documentElement.getAttribute('data-page');
  if (page !== 'home') return;
  if (type === 'load') {
    init();
  } else if (type === 'before-swap') {
    cleanup();
  }
};

// Listen for Astro's lifecycle events
document.addEventListener('astro:page-load', () => handlePageEvent('load'));
document.addEventListener('astro:before-swap', () => handlePageEvent('before-swap'));
