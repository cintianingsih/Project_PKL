<template>
  <div @click="toggleExpand" :class="['nav-link d-flex align-items-center', isActive ? 'active' : '']">
      <div
          class="text-center bg-white shadow icon icon-shape icon-sm border-radius-md d-flex align-items-center justify-content-center"
          :class="$store.state.isRTL ? 'ms-2' : 'me-2'"
      >
          <slot name="icon"></slot>
      </div>
      <span
          class="nav-link-text"
          :class="$store.state.isRTL ? 'me-1' : 'ms-1'"
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
      isActive() {
          // Check if the current route matches the main route and no child route is active
          if (this.hasChildren) {
              return this.$route.name === this.to.name && !this.isAnyChildActive;
          }
          return this.$route.name === this.to.name;
      },
      isAnyChildActive() {
          return this.children.some(child => this.$route.name === child.to.name);
      }
  },
  watch: {
      $route() {
          if (this.hasChildren) {
              this.isExpanded = this.isActive || this.isAnyChildActive;
          }
      },
  },
  methods: {
      toggleExpand() {
          if (this.hasChildren) {
              this.isExpanded = !this.isExpanded;
              if (!this.isAnyChildActive) {
                  this.$router.push(this.to);
              }
          } else {
              this.$router.push(this.to);
          }
      },
  },
};
</script>
