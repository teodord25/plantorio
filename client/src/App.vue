<template>
  <div>
    <Garden 
      :grid="grid" 
      :bots="bots" 
      @cell-clicked="handleCellClicked" 
      @bot-clicked="handleBotClicked" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Garden from './components/Garden.vue';

const rows = 20;
const columns = 30;

const grid = ref(
  Array(rows)
    .fill(null)
    .map(() =>
      Array(columns).fill(null).map(() => ({
        plant: null,
      }))
    )
);

const bots = ref([
  { id: 1, x: 5, y: 5 },
  { id: 2, x: 10, y: 15 },
]);

const handleCellClicked = ({ row, col }) => {
  const plantTypes = ['Tomato', 'Carrot', 'Lettuce'];
  const randomPlant = plantTypes[Math.floor(Math.random() * plantTypes.length)];

  // toggle plant
  grid.value[row][col].plant = grid.value[row][col].plant ? null : { type: randomPlant };
};

const handleBotClicked = (id) => {
  const bot = bots.value.find(b => b.id === id);
  if (!bot) return;

  const directions = [
    { dx: 1, dy: 0 },  // right
    { dx: -1, dy: 0 }, // left
    { dx: 0, dy: 1 },  // down
    { dx: 0, dy: -1 }, // up
  ];
  
  const direction = directions[Math.floor(Math.random() * directions.length)];

  // bounded
  const newX = Math.min(Math.max(bot.x + direction.dx, 0), columns - 1);
  const newY = Math.min(Math.max(bot.y + direction.dy, 0), rows - 1);

  bot.x = newX;
  bot.y = newY;
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}
.logo {
  height: 40px;
}
.logo.vue {
  height: 50px;
}
</style>
