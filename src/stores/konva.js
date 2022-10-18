import { defineStore } from "pinia";
import { changeCirclePosition } from "../helpers/points.js";

const width = 1250;
const height = 800;
const startX = 40;
const startY = 40;

export const useKonvaStore = defineStore("konva", {
  state: () => {
    return {
      initialPoint: 40,
      configKonva: {
        width: width,
        height: height,
      },
      rectangles: [],
      makeConnection: false,
      selectedTarget: null,
      menuButtons: {
        rectangle: [
          { name: "Delete A Rectangle", active: true },
          { name: "Add Top Circle", active: true },
          { name: "Add Right Circle", active: true },
          { name: "Add Bottom Circle", active: true },
          { name: "Add Left Circle", active: true },
        ],
        circle: [{ name: "Delete A Circle", active: true }],
      },
      selectedShapeType: null,
    };
  },
  getters: {},
  actions: {
    generateInitRectangles() {
      this.rectangles.push(
        {
          x: startX,
          y: startY,
          id: Date.now(),
          points: [
            {
              config: {
                x: changeCirclePosition(startX, "x", 0),
                y: changeCirclePosition(startY, "y", 0),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: false,
            },
            {
              config: {
                x: changeCirclePosition(startX, "x", 1),
                y: changeCirclePosition(startY, "y", 1),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: true,
            },
            {
              config: {
                x: changeCirclePosition(startX, "x", 2),
                y: changeCirclePosition(startY, "y", 2),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: true,
            },
            {
              config: {
                x: changeCirclePosition(startX, "x", 3),
                y: changeCirclePosition(startY, "y", 3),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: true,
            },
          ],
          groupConfig: {
            draggable: true,
            x: startX,
            y: startY,
          },
        },
        {
          x: startX + 200,
          y: startY + 200,
          id: Date.now() + 1,
          points: [
            {
              config: {
                x: changeCirclePosition(startX + 200, "x", 0),
                y: changeCirclePosition(startY + 200, "y", 0),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: true,
            },
            {
              config: {
                x: changeCirclePosition(startX + 200, "x", 1),
                y: changeCirclePosition(startY + 200, "y", 1),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: true,
            },
            {
              config: {
                x: changeCirclePosition(startX + 200, "x", 2),
                y: changeCirclePosition(startY + 200, "y", 2),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: true,
            },
            {
              config: {
                x: changeCirclePosition(startX + 200, "x", 3),
                y: changeCirclePosition(startY + 200, "y", 3),
                width: 20,
                height: 20,
                stroke: "black",
                fill: "black",
                strokeWidth: 4,
              },
              active: true,
            },
          ],
          groupConfig: {
            draggable: true,
            x: startX + 200,
            y: startX + 200,
          },
        }
      );
    },
    addRectangle() {
      this.rectangles.push({
        x: startX + this.initialPoint,
        y: startY + this.initialPoint,
        id: Date.now(),
        points: [
          {
            config: {
              x: changeCirclePosition(startX + this.initialPoint, "x", 0),
              y: changeCirclePosition(startY + this.initialPoint, "y", 0),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            active: true,
          },
          {
            config: {
              x: changeCirclePosition(startX + this.initialPoint, "x", 1),
              y: changeCirclePosition(startY + this.initialPoint, "y", 1),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            active: true,
          },
          {
            config: {
              x: changeCirclePosition(startX + this.initialPoint, "x", 2),
              y: changeCirclePosition(startY + this.initialPoint, "y", 2),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            active: true,
          },
          {
            config: {
              x: changeCirclePosition(startX + this.initialPoint, "x", 3),
              y: changeCirclePosition(startY + this.initialPoint, "y", 3),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            active: true,
          },
        ],
        groupConfig: {
          draggable: true,
          x: startX + this.initialPoint,
          y: startY + this.initialPoint,
        },
      });
      this.initialPoint += 40;
    },
    removeRectangle() {
      this.rectangles = this.rectangles.filter(
        (el) => el.id !== this.selectedTarget.id
      );
    },
  },
});
