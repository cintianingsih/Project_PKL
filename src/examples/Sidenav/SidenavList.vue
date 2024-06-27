<template>
  <div
      id="sidenav-collapse-main"
      class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
  >
      <ul class="navbar-nav">
          <li class="nav-item">
              <sidenav-collapse 
                nav-text="Dashboard" 
                :to="{ name: 'Dashboard' }">
                  <template #icon>
                      <icon name="dashboard" />
                  </template>
              </sidenav-collapse>
          </li>
          <li class="nav-item">
              <sidenav-collapse
                nav-text="Management"
                :to="{ name: 'Manage' }"
                :children="managementEmployeeSubmenu">
                  <template #icon>
                      <icon name="manage" />
                  </template>
              </sidenav-collapse>
          </li>
          <li class="nav-item">
              <sidenav-collapse 
                nav-text="Task" 
                :to="{ name: 'Task' }">
                  <template #icon>
                      <icon name="task" />
                  </template>
              </sidenav-collapse>
          </li>
          <li class="nav-item">
              <sidenav-collapse 
                nav-text="Activity" 
                :to="{ name: 'Activity' }">
                  <template #icon>
                      <icon name="activity" />
                  </template>
              </sidenav-collapse>
          </li>
          <li class="nav-item">
              <sidenav-collapse 
                nav-text="Set Day Off" 
                :to="{ name: 'SetDay' }">
                  <template #icon>
                      <icon name="setday" />
                  </template>
              </sidenav-collapse>
          </li>
          <li class="nav-item">
              <sidenav-collapse 
                nav-text="Mapping User Menu" 
                :to="{ name: 'Mapping' }">
                  <template #icon>
                      <icon name="mapping" />
                  </template>
              </sidenav-collapse>
          </li>
      </ul>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";

export default {
  name: "SidenavList",
  components: {
      Icon,
      SidenavCollapse,
  },
  data() {
      return {
          managementEmployeeSubmenu: [
              { navText: "Data Employee", to: { name: "DataEmployee" }, icon: "data" },
              { navText: "Approval", to: { name: "Approval" }, icon: "approval" },
              { navText: "Request PERMIT", to: { name: "RequestPermit" }, icon: "request" },
              { navText: "Overtime", to: { name: "Overtime" }, icon: "overtime" },
          ],
      };
  },
};
</script>
