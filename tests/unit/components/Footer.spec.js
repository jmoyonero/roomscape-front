import {createLocalVue, mount} from '@vue/test-utils'
import Footer from "@/components/Footer";

import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

const wrapper = mount(Footer, {
    localVue
});

describe('Pruebas unitarias de la Home', () => {

    it('Validación de elementos HTML de la Home', async () => {
        expect(wrapper.find('.footer').find('section').text()).toEqual("© 2021 Copyright:")
        expect(wrapper.find('.footer').find('a').text()).toEqual("www.roomscape.es")
    })
})