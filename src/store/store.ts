import { defineStore } from 'pinia'
import type { Category, Product } from '../types'

export const useDefaultStore = defineStore('defaultStore', {
  state: () => ({
    formData: {
      email: 'john@mail.com',
      password: 'changeme',
    },
    accessToken: '',
    productsData: [] as Product[],
    categories: [] as Category[],
    product: {} as Product,
    status: '' as String,
    statusButton: 'SEND' as String,
    page: 1,
  }),
  actions: {
    async getAuth() {
      const data = {
        email: this.formData.email,
        password: this.formData.password,
      }

      fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then((data) => {
          this.accessToken = data.access_token
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    async getProducts() {
      await fetch(`https://api.escuelajs.co/api/v1/products?limit=10&offset=${10 * (this.page - 1)}`,
      )
        .then(response => response.json())
        .then((data) => {
          this.productsData = data
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
    async getCategories() {
      await fetch('https://api.escuelajs.co/api/v1/categories',
      )
        .then(response => response.json())
        .then((data) => {
          this.categories = data
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    },
  },

})
