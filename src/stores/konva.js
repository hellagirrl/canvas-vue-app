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
              x: changeCirclePosition(startX, "x", 0),
              y: changeCirclePosition(startY, "y", 0),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            {
              x: changeCirclePosition(startX, "x", 1),
              y: changeCirclePosition(startY, "y", 1),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            {
              x: changeCirclePosition(startX, "x", 2),
              y: changeCirclePosition(startY, "y", 2),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            {
              x: changeCirclePosition(startX, "x", 3),
              y: changeCirclePosition(startY, "y", 3),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
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
              x: changeCirclePosition(startX + 200, "x", 0),
              y: changeCirclePosition(startY + 200, "y", 0),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            {
              x: changeCirclePosition(startX + 200, "x", 1),
              y: changeCirclePosition(startY + 200, "y", 1),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            {
              x: changeCirclePosition(startX + 200, "x", 2),
              y: changeCirclePosition(startY + 200, "y", 2),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
            },
            {
              x: changeCirclePosition(startX + 200, "x", 3),
              y: changeCirclePosition(startY + 200, "y", 3),
              width: 20,
              height: 20,
              stroke: "black",
              fill: "black",
              strokeWidth: 4,
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
            x: changeCirclePosition(startX + this.initialPoint, "x", 0),
            y: changeCirclePosition(startY + this.initialPoint, "y", 0),
            width: 20,
            height: 20,
            stroke: "black",
            fill: "black",
            strokeWidth: 4,
          },
          {
            x: changeCirclePosition(startX + this.initialPoint, "x", 1),
            y: changeCirclePosition(startY + this.initialPoint, "y", 1),
            width: 20,
            height: 20,
            stroke: "black",
            fill: "black",
            strokeWidth: 4,
          },
          {
            x: changeCirclePosition(startX + this.initialPoint, "x", 2),
            y: changeCirclePosition(startY + this.initialPoint, "y", 2),
            width: 20,
            height: 20,
            stroke: "black",
            fill: "black",
            strokeWidth: 4,
          },
          {
            x: changeCirclePosition(startX + this.initialPoint, "x", 3),
            y: changeCirclePosition(startY + this.initialPoint, "y", 3),
            width: 20,
            height: 20,
            stroke: "black",
            fill: "black",
            strokeWidth: 4,
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
  },
});
