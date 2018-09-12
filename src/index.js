// select elements
const $color = document.querySelector('#color');
const $number = document.querySelector('#number');
const $shape = document.querySelector('#shape');
const $reset = document.querySelector('#reset');

const defaultValue = '';
let state;

function setDefaultState() {
  console.clear();

  state = {
    color: defaultValue,
    number: defaultValue,
    shape: defaultValue
  };

  $color.value = state.color;
  $number.value = state.number;
  $shape.value = state.shape;
}

setDefaultState();

// generic data
const items = [
  {
    color: 'blue',
    number: '1',
    shape: 'circle'
  },
  {
    color: 'red',
    number: '2',
    shape: 'square'
  },
  {
    color: 'blue',
    number: '2',
    shape: 'square'
  },
  {
    color: 'blue',
    number: '2',
    shape: ''
  },
  {
    number: '2',
    shape: 'circle'
  }
];

// generate unique ID for each item
items.map((item, index) => {
  item.id = new Date().getSeconds() + index;
});

// test whether state props are equal to default value
function testForInitialState() {
  let initialStateTotal = 0;

  Object.keys(state).map(prop => {
    if (state[prop] === defaultValue) {
      initialStateTotal++;
    }
  });

  return initialStateTotal;
}

// test whether item props are equal to state props
function testAgainstState() {
  const filtered = {};

  Object.keys(state).map(prop => {
    items.map(item => {
      if (state[prop] === defaultValue) {
        // do nothing
        return;
      }

      if (item[prop] !== state[prop]) {
        filtered[item.id] = null;
      }

      if (item[prop] === state[prop] && filtered[item.id] !== null) {
        // if item has not been filtered out as null by another prop and if the item prop and state prop are equal, add the item to the filtered object
        filtered[item.id] = item.id;
      }
    });
  });

  // only return the items that appear in the filtered object
  return items.filter(item => {
    return item.id === filtered[item.id];
  });
}

function render() {
  if (testForInitialState() === 3) {
    // display all items
    console.log(items);
  } else {
    // display filtered items
    console.log(testAgainstState());
  }
}

function onChange(element) {
  element.addEventListener('change', e => {
    state[e.target.name] = e.target.value;

    console.clear();

    render();
  });
}

onChange($color);
onChange($number);
onChange($shape);

$reset.addEventListener('click', () => {
  setDefaultState();
  render();
});

console.log(items);
