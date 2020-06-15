<template>
  <div>
    {{iid}}
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      iid: null
    }
  },
  created() {
    // console.log(this.$route)
    this.iid = this.$route.params.id
  }
}
</script>

<style>

</style>