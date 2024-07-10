<template>
    <div class="container">
      <div class="header">
        <span class="project-title">{Proyecto actual}: Miembros</span>
        <button class="add-member-button">Agregar Miembro</button>
      </div>
      <div class="table-container rounded-md border bg-white">
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectAll" @change="selectAllUsers">
              </th>
              <th class="text-sm">Perfil</th>
              <th class="text-sm">Email</th>
              <th class="text-sm">Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td><input type="checkbox" v-model="selectedUsers" :value="index"></td>
              <td>{{ user.perfil }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.nombre }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DataTableMembers',
    data() {
      return {
        users: [
          { perfil: 'Administrador', email: 'ken99@yahoo.com', nombre: 'Ken Ken' },
          { perfil: 'Manager', email: 'abe45@gmail.com', nombre: 'Abe Cool' },
          { perfil: 'Manager', email: 'monserrat44@gmail.com', nombre: 'Te Queño' },
          { perfil: 'Recurso', email: 'silas22@gmail.com', nombre: 'Si Las' },
          { perfil: 'Recurso', email: 'carmella@hotmail.com', nombre: 'Car Mella' }
        ],
        selectAll: false,
        selectedUsers: []
      }
    },
    methods: {
      selectAllUsers() {
        if (this.selectAll) {
          this.selectedUsers = this.users.map((user, index) => index);
        } else {
          this.selectedUsers = [];
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    width: 100%;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .project-title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .add-member-button {
    background-color: #ff5722;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .table-container {
    margin-top: 16px;
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th input[type="checkbox"], td input[type="checkbox"] {
    margin: 0;
  }
  </style>
  
  