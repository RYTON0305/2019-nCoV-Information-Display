<template>
  <div class="home">
    <a-button type="danger">Danger</a-button>
    <a-input placeholder="Basic usage" />
    <div>
      <a-time-picker use12Hours @change="onChange" />
      <a-time-picker use12Hours format="h:mm:ss A" @change="onChange" />
      <a-time-picker use12Hours format="h:mm a" @change="onChange" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  methods: {
    onChange(time, timeString) {
      console.log(time, timeString);
    },
  },
};
</script>
