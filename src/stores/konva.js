import { defineStore } from "pinia";
import { getCirclePosition } from "../helpers/points.js";

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
      selectedShapeType: null,
    };
  },
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
                x: getCirclePosition(startX, "x", 0),
                y: getCirclePosition(startY, "y", 0),
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
                x: getCirclePosition(startX, "x", 1),
                y: getCirclePosition(startY, "y", 1),
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
                x: getCirclePosition(startX, "x", 2),
                y: getCirclePosition(startY, "y", 2),
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
                x: getCirclePosition(startX, "x", 3),
                y: getCirclePosition(startY, "y", 3),
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
          menu: {
            rectangle: [
              { name: "Delete Rectangle", active: true },
              { name: "Add Top Circle", active: true },
              { name: "Add Right Circle", active: false },
              { name: "Add Bottom Circle", active: false },
              { name: "Add Left Circle", active: false },
            ],
            circle: [{ name: "Delete Circle", active: true }],
          },
        },
        {
          x: startX + 200,
          y: startY + 200,
          id: Date.now() + 1,
          points: [
            {
              config: {
                x: getCirclePosition(startX + 200, "x", 0),
                y: getCirclePosition(startY + 200, "y", 0),
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
                x: getCirclePosition(startX + 200, "x", 1),
                y: getCirclePosition(startY + 200, "y", 1),
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
                x: getCirclePosition(startX + 200, "x", 2),
                y: getCirclePosition(startY + 200, "y", 2),
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
                x: getCirclePosition(startX + 200, "x", 3),
                y: getCirclePosition(startY + 200, "y", 3),
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
          menu: {
            rectangle: [
              { name: "Delete Rectangle", active: true },
              { name: "Add Top Circle", active: false },
              { name: "Add Right Circle", active: false },
              { name: "Add Bottom Circle", active: false },
              { name: "Add Left Circle", active: false },
            ],
            circle: [{ name: "Delete Circle", active: true }],
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
              x: getCirclePosition(startX + this.initialPoint, "x", 0),
              y: getCirclePosition(startY + this.initialPoint, "y", 0),
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
              x: getCirclePosition(startX + this.initialPoint, "x", 1),
              y: getCirclePosition(startY + this.initialPoint, "y", 1),
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
              x: getCirclePosition(startX + this.initialPoint, "x", 2),
              y: getCirclePosition(startY + this.initialPoint, "y", 2),
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
              x: getCirclePosition(startX + this.initialPoint, "x", 3),
              y: getCirclePosition(startY + this.initialPoint, "y", 3),
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
        menu: {
          rectangle: [
            { name: "Delete Rectangle", active: true },
            { name: "Add Top Circle", active: false },
            { name: "Add Right Circle", active: false },
            { name: "Add Bottom Circle", active: false },
            { name: "Add Left Circle", active: false },
          ],
          circle: [{ name: "Delete  Circle", active: true }],
        },
      });
      this.initialPoint += 40;
    },
    removeRectangle() {
      this.rectangles = this.rectangles.filter(
        (el) => el.id !== this.selectedTarget.id
      );
    },
    removeCircle(circle) {
      const elementToUpdate = this.rectangles.findIndex(
        (rectangle) => rectangle.id === this.selectedTarget.id
      );
      const pointToUpdate = this.rectangles[elementToUpdate].points.findIndex(
        (p) => {
          const { x, y } = p.config;
          const { x: x1, y: y1 } = circle;
          return x == x1 && y == y1;
        }
      );

      // Hide deleted circle
      this.rectangles[elementToUpdate].points[pointToUpdate].active = false;

      // Update button state for each deleted circle
      this.rectangles[elementToUpdate].menu["rectangle"][
        pointToUpdate + 1
      ].active = true;
    },
    addCircle(position) {
      const elementToUpdate = this.rectangles.findIndex(
        (rectangle) => rectangle.id === this.selectedTarget.id
      );

      switch (position) {
        case "top":
          this.rectangles[elementToUpdate].points[0].active = true;
          this.rectangles[elementToUpdate].menu["rectangle"][1].active = false;
          break;

        case "right":
          this.rectangles[elementToUpdate].points[1].active = true;
          this.rectangles[elementToUpdate].menu["rectangle"][2].active = false;
          break;

        case "bottom":
          this.rectangles[elementToUpdate].points[2].active = true;
          this.rectangles[elementToUpdate].menu["rectangle"][3].active = false;
          break;

        case "left":
          this.rectangles[elementToUpdate].points[3].active = true;
          this.rectangles[elementToUpdate].menu["rectangle"][4].active = false;
          break;
      }
    },
  },
});
