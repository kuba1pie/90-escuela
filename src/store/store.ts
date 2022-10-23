import { defineStore } from 'pinia'
import { ResponseItem } from '../types';

export const useDefaultStore = defineStore('defaultStore', {
  state: () => ({
    email: 'john@mail.com',
    password: 'changeme',
    accessToken: '',
    productsData: {}
  }),
  actions: {
    async getWeather() {
      const data = {
        email: this.email,
        password: this.password
      }

      fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.accessToken = data.access_token
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    async getProducts(offset=0) {
      await fetch('https://api.escuelajs.co/api/v1/products?limit=20&offset=' + offset
      )
        .then((response) => response.json())
        .then((data) => {
          this.productsData = data
        })
        .catch((error) => {
          console.error('Error:', error);
        });      
  }
  }, 

})