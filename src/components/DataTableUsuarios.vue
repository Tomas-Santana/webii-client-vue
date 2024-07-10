<template>
    <div class="datatable">
      <div class="header">
        <span class="project-title">Administrar usuarios</span>
        <button class="add-member-button">Agregar Persona</button>
      </div>
      <div class="table-container rounded-md border bg-white">
        <table>
          <thead>
            <tr>
              <th class="text-sm">Email</th>
              <th class="text-sm">Nombre</th>
              <th class="text-sm">Apellido</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td class="email-column">{{ user.email }}</td>
              <td>{{ user.nombre }}</td>
              <td>{{ user.apellido }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DataTable',
    data() {
      return {
        users: [
          { email: 'juan@example.com', nombre: 'Juan',  apellido: 'Pérez' },
          { email: 'ana@example.com', nombre: 'Ana', apellido: 'Gómez' },
          { email: 'luis@example.com', nombre: 'Luis', apellido: 'Martínez' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  .datatable {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
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
    overflow-x: auto;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: white;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 12px ;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .email-column {
    padding-left: 16px;
  }
  
  th.text-sm, td.text-sm {
    font-size: 0.875rem;
  }
  </style>
  
  