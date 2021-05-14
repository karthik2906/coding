import { mount } from '@vue/test-utils'
import flushPromises from "flush-promises";
import App from '@/App.vue'
import axios from 'axios';
import products from '../mock/product-response.json';

jest.mock('axios');

describe('App.vue', () => {
  let wrapper;
  beforeEach(async () => {
    axios.get.mockImplementation(() => Promise.resolve({
      data: { groups: products }
    }));
    wrapper = mount(App, {
      stubs: ["b-carousel", "b-carousel-slide"]
    })
    await flushPromises();
  })
  describe('created', () => {
    it('should get products', () => {
      expect(axios.get).toHaveBeenCalled();
    });
    it('should set products ', () => {
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.products.length).toBe(10);
      });
    });
  });
  describe('methods', () => {
    describe('showModal', () => {
      it('should set value for images', () => {
        wrapper.vm.showModal(products[0]);
        expect(wrapper.vm.displayModal).toBe(true);
        expect(wrapper.vm.images.length).toBe(3);
      });

      it('should set value for images', () => {
        wrapper.vm.showModal(products[0]);
        expect(wrapper.vm.displayModal).toBe(true);
        expect(wrapper.vm.images.length).toBe(3);
      });
    });
  });
});
