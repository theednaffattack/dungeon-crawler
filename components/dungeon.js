import _ from 'lodash';
import React, { Component } from 'react';
// ////////////////////////////////////algorithm part//////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////

// settings
// constants, BEG
const GRID_HEIGHT = 40;
const GRID_WIDTH = 40;
const MAX_ROOMS = 15;
const ROOM_SIZE_RANGE = [7, 12];

const c = {
  GRID_HEIGHT,
  GRID_WIDTH,
  MAX_ROOMS,
  ROOM_SIZE_RANGE,
};
// constants, BEG

const createDungeon = () => {
  // //////////////HELPER FUNCTIONS GO HERE ////////////////////

  // //////////////////////////////////////////////////////////
  // BUILD OUT THE MAP

  // 1. make a grid of 'empty' cells, with a random opacity value (for styling)
  let grid = [];
  for (let i = 0; i < c.GRID_HEIGHT; i++) {
    grid.push([]);
    for (let j = 0; j < c.GRID_WIDTH; j++) {
      grid[i].push({ type: 0, opacity: _.random(0.3, 0.8).toFixed(1) });
    }
  }
  // 2. random values for the first room

  const [min, max] = c.ROOM_SIZE_RANGE;
  const firstRoom = {
    x: _.random(1, c.GRID_WIDTH - max - 15),
    y: _.random(1, c.GRID_HEIGHT - max - 15),
    height: _.random(min, max),
    width: _.random(min, max),
    // we give an id that we will use for visualization purposes later
    id: 'O',
  };

  // delete the console log after testing it
  console.log('firstRoom');
  console.log(firstRoom);

  // 3. place the first room on to grid

  const placeCells = (grid, {x, y, width = 1, height = 1, id}, type = 'floor') => {
		for (let i = y; i < y + height; i++) {
			for (let j = x; j < x + width; j++) {
				grid[i][j] = {type, id};
			}
		}
		return grid;
	};

  grid = placeCells(grid, firstRoom);

  return grid;
};

export const firstStore = {
  dungeon: createDungeon(),
};

export default class Dungeon extends Component {
  render() {
    const { store } = this.props;
    const cells = store.map((element, index) => (
      <div className="row" style={{display: "flex", justifyContent: 'center', fontSize: 6, color: "red"}} key={Date.now() + index}>
        {element.map((cell, i) => (
          <div
            className={cell.type == 'floor' || cell.type == 'door' ? `cell ${cell.type}` : 'cell'}
            style={{
							border: 1,
							borderColor: 'black',
							height: 10,
							width: 10,
							backgroundColor: 'green',
							opacity: cell.opacity,
						}}
            key={cell.type + i}
          >
            {cell.id}
          </div>
				))}
      </div>
    ));

    return (
      <div
        className="app"
        style={{
					display: 'flex',
					justifyContent: 'center',
				}}
      >
        <div className="flex-container" style={{border: 1, borderColor: "rgba(0,0,0,0.2)"}}>{cells}</div>
      </div>
    );
  }
}
