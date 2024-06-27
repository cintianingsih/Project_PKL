<template>
    <div>
      <div class="m-5 card">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-person-lines-fill me-2"></i>
            <h5 class="card-title m-0" style="font-size: 19px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif;">Form User</h5>
          </div>
          <button class="btn btn-primary d-flex align-items-center">
            <i class="bi bi-person-add me-2"></i>
            Add Pegawai
          </button>
        </div>
        <div class="card-footer text-body-secondary d-flex align-items-center">
          <i class="bi bi-house-door me-2"></i>
          <router-link to="/dashboard" class="text-decoration-none text-body-secondary">Dashboard</router-link>
        </div>
      </div>
  
      <div class="m-5 card text-center">
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'list' }" aria-current="true" href="#" @click="setActiveTab('list')">List Employee</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" :class="{ active: activeTab === 'salary' }" aria-current="true" href="#" @click="setActiveTab('salary')">Salary Slip</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div v-if="activeTab === 'list'">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="input-group search-form" style="max-width: 400px;">
                <span class="input-group-text"><i class="bi bi-search"></i></span>
                <input v-model="searchQuery" type="text" class="form-control" placeholder="Search Employee">
              </div>
              <div class="d-flex align-items-center">
                <label for="entries" class="form-label me-2 mb-0">Show</label>
                <select id="entries" v-model="entriesToShow" class="form-select" style="max-width: 75px;" @change="updatePageCount">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span class="ms-2">entries</span>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col" @click="sortTable('nik')">NIK <i :class="getSortIcon('nik')"></i></th>
                    <th scope="col" @click="sortTable('firstName')">Nama <i :class="getSortIcon('firstName')"></i></th>
                    <th scope="col" @click="sortTable('joinDate')">Join Date <i :class="getSortIcon('joinDate')"></i></th>
                    <th scope="col" @click="sortTable('division')">Divisi <i :class="getSortIcon('division')"></i></th>
                    <th scope="col" @click="sortTable('position')">Posisi <i :class="getSortIcon('position')"></i></th>
                    <th scope="col" @click="sortTable('status')">Status <i :class="getSortIcon('status')"></i></th>
                    <th scope="col" @click="sortTable('leaveBalance')">Sisa Cuti <i :class="getSortIcon('leaveBalance')"></i></th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  <tr v-for="(employee, index) in paginatedEmployees" :key="employee.nik">
                    <td>{{ (currentPage - 1) * entriesToShow + index + 1 }}</td>
                    <td>{{ employee.nik }}</td>
                    <td>{{ employee.firstName }} {{ employee.lastName }}</td>
                    <td>{{ employee.joinDate }}</td>
                    <td>{{ employee.division }}</td>
                    <td>{{ employee.position }}</td>
                    <td>{{ employee.status }}</td>
                    <td>{{ employee.leaveBalance }}</td>
                    <td>
                      <button class="btn btn-sm btn-success" @click="viewDetail(employee)">
                        View Detail <i class="bi bi-pencil-square"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span v-if="totalPages > 0">Page {{ currentPage }} of {{ totalPages }}</span>
              </div>
              <div>
                <button class="btn btn-primary" :disabled="currentPage === 1" @click="prevPage">Previous</button>
                <button class="btn btn-primary ms-2" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
  export default {
    data() {
      return {
        activeTab: 'list',
        searchQuery: '',
        entriesToShow: 10,
        currentPage: 1,
        sortColumn: '',
        sortOrder: 'asc',
        employees: [
          { nik: '001', firstName: 'Mark', lastName: 'Otto', joinDate: '2023-01-01', division: 'IT', position: 'Engineer', status: 'Active', leaveBalance: 20 },
          { nik: '002', firstName: 'Jacob', lastName: 'Thornton', joinDate: '2023-02-15', division: 'HR', position: 'Manager', status: 'Active', leaveBalance: 15 },
          { nik: '003', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '004', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '005', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '006', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '007', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '008', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '009', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '010', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '011', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '012', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '013', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '014', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '015', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '016', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
          { nik: '017', firstName: 'Larry', lastName: 'the Bird', joinDate: '2023-03-20', division: 'Finance', position: 'Accountant', status: 'Inactive', leaveBalance: 10 },
        ]
      };
    },
    computed: {
      paginatedEmployees() {
        const start = (this.currentPage - 1) * this.entriesToShow;
        const end = start + this.entriesToShow;
        return this.filteredEmployees.slice(start, end);
      },
      filteredEmployees() {
        let employees = this.employees.filter(employee =>
          (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(this.searchQuery.toLowerCase())
        );
  
        if (this.sortColumn && this.sortColumn !== 'No') {
          employees.sort((a, b) => {
            let result = 0;
            if (this.sortColumn === 'nik' || this.sortColumn === 'leaveBalance') {
              // Handling numeric sorting
              result = (a[this.sortColumn] > b[this.sortColumn]) ? 1 : (a[this.sortColumn] < b[this.sortColumn]) ? -1 : 0;
            } else if (this.sortColumn === 'joinDate') {
              // Handling date sorting
              result = new Date(a[this.sortColumn]) - new Date(b[this.sortColumn]);
            } else {
              // Default string sorting
              result = a[this.sortColumn].localeCompare(b[this.sortColumn]);
            }
            return this.sortOrder === 'asc' ? result : -result;
          });
        }
  
        return employees;
      },
      totalPages() {
        return Math.ceil(this.filteredEmployees.length / this.entriesToShow);
      }
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      },
      sortTable(column) {
        if (column !== 'Action') {
          if (column === 'No') {
            // Do not sort for No column
            return;
          }
          if (this.sortColumn === column) {
            this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
          } else {
            this.sortColumn = column;
            this.sortOrder = 'asc';
          }
        }
      },
      getSortIcon(column) {
        if (this.sortColumn === column) {
          return this.sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
        }
        return 'bi bi-caret-down';
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      updatePageCount() {
        // Reset current page to 1 when changing entries to show
        this.currentPage = 1;
      },
      viewDetail(employee) {
        // Replace with your logic for viewing employee details
        console.log('Viewing employee details:', employee);
      }
    }
  };
</script>
  
<style scoped>
  .nav-link {
    color: #888;
  }
  .nav-link.active {
    color: #000;
  }
</style>