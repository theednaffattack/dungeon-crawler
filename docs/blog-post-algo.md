# Dungeon with rooms algorithm for Javascript ultimate begginer guide!

![img](https://cdn-images-1.medium.com/max/1600/1*VKdtJNmdtvQp38V-FBhsRg.jpeg)

this picture is for illustration purposes only :)

Hello and welcome, in this tutorial i will guide you in the creation of an random dungeon generator with Javascript. Recently as an assignment for [Free Code Camp](https://medium.com/@FreeCodeCamp) i had to create an dungeon with random rooms and the first thing i noticed when i was doing my research is that all the writen tutorials out there are for medium to advanced programers.

Well, i wanted to create an tutorial for novice programers, like me, who are just beggining to grasp to beauty and the complexity of programing.The code i will use here is an extract from Peter Daily ‘s pen [Roguelike Dungeon Crawler](http://codepen.io/thepeted/pen/aNrdzP), that was kind enough to explain to me how everithing works.

In this tutorial we will be using [ES6](https://www.youtube.com/watch?v=AfWYO8t7ed4) destructuring a lot, so be sure to get familiar with the syntax before proceding.

------

### The Begining

![img](https://cdn-images-1.medium.com/max/1600/1*b8f042mHrKsS54rctbvSrQ.jpeg)

THE ALGORITHM and me!

The first thing we do is create an simple function for creating an 2d array of ‘empty’ cells, with a random opacity value (for styling).

Here is an empty CODEPEN [template](http://codepen.io/Spartano/pen/VKvLVa?editors=1010) that has everithing preseted, split you’re screen and we can begin to code right away.

> All the functions that we will create will have the same scope → createDungeon(), no nesting . Check the[ finished](https://gist.github.com/Spartano/eaccc74636a550a026c89f216baf948f) version if encounter any problems.

We now create our first room with coordinates.

```javascript
// 2. random values for the first room

/*    ES6 before and after
const ROOM_SIZE_RANGE = [7, 12];
var min =  ROOM_SIZE_RANGE[0];
var max = ROOM_SIZE_RANGE[1]

in ES6 you can swap variables too witout the need for a temporary value
[a,b] = [b,a]
more info at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
*/

// the _ is loaded from the lodash library that has very usefull methods like the random method below

const [min, max] = c.ROOM_SIZE_RANGE;
const firstRoom = {
  x: _.random(1, c.GRID_WIDTH - max - 15),
  y: _.random(1, c.GRID_HEIGHT - max - 15),
  height: _.random(min, max),
  width: _.random(min,max),
  // we give an id that we will use for visualization purposes later
  id:'O'
};
//delete the console log after testing it
console.log(firstRoom);
```



Now we place our room inside the grid and make use of the id property we just created in the first room for visualization.

```javascript
// 3. place the first room on to grid

/*ES6 before and after 
const placeCells = (grid, obj, type){
  var x = obj.x;
  var y = obj.y;
  var id = obj.id;
  
  if(obj.width == undefined) { obj.width = 1;}
  var width = obj.width;
  
   if(obj.height == undefined) {obj.height = 1;}
  var height = obj.height;
  
  if(type == undefined) type='floor'
  
  for...
  return grid;
}*/

//We give default values to the width and height because so, when we will place our door cell we can pass only x and y
// the id will be used for visual demonstration
const placeCells = (grid, {x, y, width = 1, height = 1, id}, type = 'floor') => {
		for (let i = y; i < y + height; i++) {
			for (let j = x; j < x + width; j++) {
				// the {} means that we are passing an object with 2 props, type and id 
				//since we use ES6 we  dont need to say {type: type, id: id}
				grid[i][j] = {type, id};
			}
		}
		return grid;
	};

grid = placeCells(grid, firstRoom);
```



Our grid now should look like this

![img](https://cdn-images-1.medium.com/max/1600/1*SoyPmML9Ef1tDfr0pdVH-g.jpeg)

For convenience move the placeCells() inside the helper function segment right at the beginning of our createDungeon().

------

![img](https://cdn-images-1.medium.com/max/1600/1*03rO5Zr63a2FuYFnLNwh_A.jpeg)

Here comes the tricky part. Using the first room as a seed, recursivley we then add rooms to the grid. Our function will take 4 parameters: the grid array, an array that will store all the rooms that we will create at each iteration and finaly 2 integers named counter and maxRooms.

```javascript
//recursive function
const growMap = (grid, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {}
```

And when we will use it will look like this:

```javascript
 growMap(grid, firstRoom);
```

but since our recursive takes an array as second parameter we use ES6 and say

```javascript
//[firstRoom] creates an array with firstRoom as it's first value
growMap(grid, [firstRoom]);
```

------

What we want is a function that adds random rooms starting from the first seed that just passed.

Our createRoomsFromSeed will take an grid array, an object(room), and an default value for range.

```javascript
const createRoomsFromSeed = (grid, {x, y, width, height}, range = c.ROOM_SIZE_RANGE) => {}
```

One way we could do that is to take the 4 cardinal directions(N,E,S,W) and place one room on each (edge +1 space) of the room(object) given to it, then using a forEach() we check if each room can be placed inside our grid, if so, placeCells() and then,

> return the new grid and the array with the rooms just placed.

Why we need the array? because we will need the last room of the array for generating other rooms in the 4 directions.

```javascript
const createRoomsFromSeed = (grid, {x, y, width, height}, range = c.ROOM_SIZE_RANGE) => {
    const placedRooms = [];
    roomValues = [{northRoom}, {southRoom}, {eastRoom}, {westRoom}]
    roomValues.forEach(room => { 
    if (isValidRoomPlacement(grid, room)) {

    grid = placeCells(grid, room);
    placedRooms.push(room);
       }
    };//end forEach
   return {grid, placedRooms};
}
```

------

Visual representation of the recursive iteration:

In the first iteration we generate 2 rooms and return them as an array.

In the second iteration we take the last room of the array and we generate 3 rooms, 2 of wich aren’t valid because one overlaps the origin room and the other is addiacent with the room on the right of the origin room.

In the third iteration we take the last room of the array that we return and we generate 2 rooms, one is good and the other is addiacent to one of the first rooms.

![img](https://cdn-images-1.medium.com/max/1600/1*zUsOHgtm9OAEOUukfi1kgA.jpeg)

------

Inside it will make use of an function to check if isValidRoomPlacement(). Let’s define that function and put it in the helper function section.

```javascript
const createDungeon = () => {
 // HELPER FUNCTIONS FOR CREATING THE MAP
 const isValidRoomPlacement...
 const placeCells...
}
```

Now we just need a way of creating the 4 rooms and the function is ready to be used in our recursive.

```javascript

const isValidRoomPlacement = (grid, {x, y, width = 1, height = 1}) => {
		// check if on the edge of or outside of the grid
		if (y < 1 || y + height > grid.length - 1) {
			return false;
		}
		if (x < 1 || x + width > grid[0].length - 1) {
			return false;
		}

		// here you go from y-1 to y+height+1 and check id they are any floors
		for (let i = y - 1; i < y + height + 1; i++) {
			for (let j = x - 1; j < x + width + 1; j++) {
				if (grid[i][j].type === 'floor') {
					return false;
				}
			}
		}
		// all grid cells are clear
		return true;
	};
```



------

Data visualization of the recursive iteration:

![img](https://cdn-images-1.medium.com/max/2000/1*hdh6vJw4tB49DITm9xtMBw.png)

when subtracting -1 is because we dont want the new room to start from edge of the initial room.

In the first iteration using the first room x and y properties we generate 2 rooms and return them as an array.

In the second iteration we take the last room of the array(the south room) and make use of it’s x and y properties for generating new values for the 4 cardinal rooms.In the finished [pen](http://codepen.io/Spartano/pen/dpoZdw?editors=0011) i have added some console logs that will print the values of the rooms created so just do the math and everithing will be clear.

![img](https://cdn-images-1.medium.com/max/1600/1*EpmObECHO3OymWrBd8hmgA.jpeg)

Here is the complete function:

```javascript

const createRoomsFromSeed = (grid, {x, y, width, height}, range = c.ROOM_SIZE_RANGE) => {
		// range for generating the random room heights and widths
		const [min, max] = range;

		// generate room values for each edge of the seed room
		const roomValues = [];

		const north = { height: _.random(min, max), width: _.random(min, max) };
		//dont get confused about the height and width property when declaring a room.
		
		//the x,y,height and width we use from now on are the ones
		//we pass in the initial function declaration createRoomsFromSeed()
		
		north.x = _.random(x, x + width - 1);
		north.y = y - north.height - 1;
		north.doorx = _.random(north.x, (Math.min(north.x + north.width, x + width)) - 1);
		north.doory = y - 1;
		north.id='N';
		roomValues.push(north);

		const east = { height: _.random(min, max), width: _.random(min, max) };
		east.x = x + width + 1;
		east.y = _.random(y, height + y - 1);
		east.doorx = east.x - 1;
		east.doory = _.random(east.y, (Math.min(east.y + east.height, y + height)) - 1);
		east.id='E';
		roomValues.push(east);

		const south = { height: _.random(min, max), width: _.random(min, max) };
		south.x = _.random(x, width + x - 1);
		south.y = y + height + 1;
		south.doorx = _.random(south.x, (Math.min(south.x + south.width, x + width)) - 1);
		south.doory = y + height;
		south.id='S';
		roomValues.push(south);

		const west = { height: _.random(min, max), width: _.random(min, max) };
		west.x = x - west.width - 1;
		west.y = _.random(y, height + y - 1);
		west.doorx = x - 1;
		west.doory = _.random(west.y, (Math.min(west.y + west.height, y + height)) - 1);
		west.id='W';
		roomValues.push(west);

		const placedRooms = [];
		roomValues.forEach(room => {
			if (isValidRoomPlacement(grid, room)) {
				// place room
				grid = placeCells(grid, room);
				// place door
				grid = placeCells(grid, {x: room.doorx, y: room.doory}, 'door');
				// need placed room values for the next seeds
				placedRooms.push(room);
			}
		});
		
		//it returns an object --> {}
		return {grid, placedRooms};
	};
view rawr_5.js hosted with ❤ by GitHub
```



We create an id property for each room so that we can easily understand from where they were originated

The last thing we miss is writing our recursive.

------

![img](https://cdn-images-1.medium.com/max/1600/1*QvsrlOYIUj4W5fhF6zeGPQ.jpeg)

Since it’s an recursive function we begin writing the break condition, and by doing so we must think of what will happen in the last and second-to-last iterations.

Look at the code below and everithing will be clear.We are putting 2 conditions:

1. we have placed already number of rooms desired
2. the seedRooms array is empty because in the second-to-last iteration we have tryed to place the rooms in all directions but that was not possible, so we are returning an empty array.

```
if (counter + seedRooms.length > maxRooms || seedRooms.length == 0) {
 return grid;
 }
```

And now the body of the function:

```javascript

// 4. using the first room as a seed, recursivley add rooms to the grid
	const growMap = (grid, seedRooms, counter = 1, maxRooms = c.MAX_ROOMS) => {
		//think about the last and second-to-last iteration
		if (counter + seedRooms.length > maxRooms || !seedRooms.length) {
			return grid;
		}
		
		//grid will be an obj that has an grid property and placedRooms property	
		grid = createRoomsFromSeed(grid, seedRooms.pop());
		
		// ... is an spread operator
		// [1,2,3].push(...[4,5,6]) result in [1,2,3,4,5,6] not [1,2,3,[4,5,6]]
		
		seedRooms.push(...grid.placedRooms);
		counter += grid.placedRooms.length;
		return growMap(grid.grid, seedRooms, counter);
	};
	//with this return we generate the final version of our grid that we will use outside.
	//ES6 --> [firstRoom] creates an array with  the firstRoom object as it's first element 
	return growMap(grid, [firstRoom]);
```



#### And we are finished now. I am adding an finished Codepen with all the code for reference.

------

Congratulations and thank you for you’re time.If you want to learn more on how to use it i have writen an tutorial on how to make an [Random Dungeon Crawler](https://medium.com/@victorcatalintorac/react-redux-dungeon-crawler-7b52e67806bd#.1mpjrxn7y) using this algorithm.

If you enjoyed this article share it or leave it a like, the author greatly apreciates it :)

### The End

![img](https://cdn-images-1.medium.com/max/1600/1*7pqNiqA-h1R2HfAsYqtTvQ.jpeg)

