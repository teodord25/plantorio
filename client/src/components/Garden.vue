<template>
  <svg :width="width" :height="height" style="border:1px solid #ccc;">
    <!-- iterate through each row -->
    <g v-for="(row, rowIndex) in grid" :key="'row-' + rowIndex">
      <!-- iterate through each cell in the row -->
      <rect
        v-for="(cell, colIndex) in row"
        :key="'cell-' + rowIndex + '-' + colIndex"
        :x="colIndex * cellSize"
        :y="rowIndex * cellSize"
        :width="cellSize"
        :height="cellSize"
        :fill="cell.plant ? plantColors[cell.plant.type] : '#e0ffe0'"
        stroke="#ccc"
        @click="cellClicked(rowIndex, colIndex)"
      />
    </g>

    <!-- Iterate through bots -->
    <circle
      v-for="bot in bots"
      :key="'bot-' + bot.id"
      :cx="bot.x * cellSize + cellSize / 2"
      :cy="bot.y * cellSize + cellSize / 2"
      :r="cellSize / 3"
      fill="red"
      @click.stop="botClicked(bot.id)"
    />
  </svg>
</template>

<script>
export default {
  name: "Garden",
  props: {
    grid: {
      type: Array,
      required: true,

      // NOTE: validator ensures grid is a 2D array
      validator(value) {
        return Array.isArray(value) && value.every(row => Array.isArray(row));
      },
    },

    bots: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cellSize: 25, // size of each cell in pixels
      plantColors: {
        Tomato: '#FF6347',
        Carrot: '#FFA500',
        Lettuce: '#32CD32',
      },
    };
  },
  computed: {
    rows() {
      return this.grid.length;
    },
    columns() {
      return this.grid[0]?.length || 0;
    },
    width() {
      return this.cellSize * this.columns;
    },
    height() {
      return this.cellSize * this.rows;
    },
  },
  methods: {
    cellClicked(rowIndex, colIndex) {
      this.$emit('cell-clicked', { row: rowIndex, col: colIndex });
    },
    botClicked(id) {
      this.$emit('bot-clicked', id);
    },
  },
};
</script>

<style scoped>
svg {
  display: block;
  margin: auto;
}
</style>
