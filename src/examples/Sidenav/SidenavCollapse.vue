<template>
    <div @click="toggleExpand" class="nav-link d-flex align-items-center">
      <div
        class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
        :class="$store.state.isRTL ? ' ms-2' : 'me-2'"
      >
        <slot name="icon"></slot>
      </div>
      <span
        class="nav-link-text"
        :class="$store.state.isRTL ? ' me-1' : 'ms-1'"
      >{{ navText }}</span>
      <i v-if="hasChildren" class="fas fa-chevron-down ms-auto"></i>
    </div>
    <ul v-if="hasChildren && isExpanded" class="navbar-nav ms-3">
      <li v-for="child in children" :key="child.navText" class="nav-item">
        <sidenav-collapse :nav-text="child.navText" :to="child.to">
          <template #icon>
            <icon :name="child.icon" />
          </template>
        </sidenav-collapse>
      </li>
    </ul>
</template>

<script>
export default {
  name: "SidenavCollapse",
  props: {
    to: {
      type: [Object, String],
      required: true,
    },
    navText: {
      type: String,
      required: true,
    },
    children: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    hasChildren() {
      return this.children.length > 0;
    },
  },
  methods: {
    toggleExpand() {
      if (this.hasChildren) {
        this.isExpanded = !this.isExpanded;
      } else {
        this.$router.push(this.to);
      }
    },
  },
};
</script>
