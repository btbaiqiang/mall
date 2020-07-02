<template>
  <div id="detail_params" v-if="Object.keys(paramInfo).length !== 0">
    <table class="params_rule" v-for="(table, index) in paramInfo.rule.tables" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="params_set" v-for="(set, indep) in paramInfo.info.set">
      <tr>
        <th>{{set.key}}</th>
        <td>{{set.value}}</td>
      </tr>
      <tr v-for="(tr, indea) in set" :key="indea">
        <th>{{tr.key}}</th>
        
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
#detail_params {
  font-size: 0.65rem;
  padding: 0.42rem 0.34rem;
  border-bottom: 0.3rem solid rgba(128, 128, 128, 0.2);
}
.params_rule,
.params_set {
  border-bottom: 0.1rem solid rgba(128, 128, 128, 0.5);
  border-collapse: collapse; /* 可以合并邻近的边框，且可以让tr显示出边框 */
  margin: 0 auto;
  margin-bottom: 0.42rem;
  width: 13.568rem;
}
.params_rule tr,
.params_set tr {
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.5);
}
.params_rule th {
  text-align: left;
  padding-right: 1rem;
  white-space: nowrap;
}
.params_rule td {
  padding: 0.5rem;
}
.params_set th {
  text-align: left;
  padding: 0.5rem 3.5rem 0.5rem 0rem;
  white-space: nowrap;
}
.params_set td {
  color: var(--color-high-text);
}
.info_img img {
  width: 100%;
}
</style>