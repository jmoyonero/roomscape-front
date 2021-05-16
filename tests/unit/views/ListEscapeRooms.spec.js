import {createLocalVue, mount} from '@vue/test-utils'
import ListEscapeRooms from "@/views/escape-rooms/ListEscapeRooms";

import BootstrapVue from 'bootstrap-vue'

const localVue = createLocalVue();
localVue.use(BootstrapVue);

import axios from 'axios';

jest.mock('axios');

let mixResponse = {
    "data": [
        {
            "nombre": "escape-room-active",
            "activo": true,
            "duracion": 30,
            "precio": 15,
            "capacidadPersonas": 5
        },
        {
            "nombre": "escape-room-inactive",
            "activo": false,
            "duracion": 30,
            "precio": 15,
            "capacidadPersonas": 5
        }]
}
let allInactiveResponse = {
    "data": [
        {
            "nombre": "escape-room-active",
            "activo": false,
            "duracion": 30,
            "precio": 15,
            "capacidadPersonas": 5
        },
        {
            "nombre": "escape-room-inactive",
            "activo": false,
            "duracion": 30,
            "precio": 15,
            "capacidadPersonas": 5
        }]
}
let emptyResponse = {
    "data": []
}

describe('Pruebas unitarias de la vista: listado de escape rooms', () => {

    axios.get = jest.fn().mockResolvedValue(emptyResponse);
    let wrapper = mount(ListEscapeRooms, {
        localVue
    });

    it('Validación del mensaje a mostrar cuando la lista de escape rooms es vacía', async () => {
        expect(wrapper.find('.escape_rooms_list_title').text()).toEqual("ESCAPE ROOMS")
        expect(wrapper.find('.empty_msg').text()).toEqual("En este momento no hay escape rooms disponibles.")
    })
})

describe('Pruebas unitarias de la vista: listado de escape rooms', () => {

    axios.get = jest.fn().mockResolvedValue(allInactiveResponse);
    let wrapper = mount(ListEscapeRooms, {
        localVue
    });

    it('Validación del mensaje a mostrar cuando todos los escape rooms se encuentran inactivos', async () => {
        expect(wrapper.find('.escape_rooms_list_title').text()).toEqual("ESCAPE ROOMS")
        expect(wrapper.find('.empty_msg').text()).toEqual("En este momento no hay escape rooms disponibles.")
    })
})

describe('Pruebas unitarias de la vista: listado de escape rooms', () => {

    axios.get = jest.fn().mockResolvedValue(mixResponse);
    let wrapper = mount(ListEscapeRooms, {
        localVue
    });

    it('Validación del listado de escape room con elementos inactivos', async () => {
        expect(wrapper.find('.escape_rooms_list_title').text()).toEqual("ESCAPE ROOMS")
        let cards = wrapper.find('.escape_rooms_list_container').findAll('.card_container')
        expect(cards.wrappers.length).toEqual(1)

        let card = cards.at(0).find('.card-body')
        expect(card.find('.card-title').text()).toEqual("escape-room-active")
        expect(card.findAll('.card-text').at(0).text()).toEqual("Capacidad Máxima: 5 personas")
        expect(card.findAll('.card-text').at(1).text()).toEqual("Duración: 30 minutos")
        expect(card.findAll('.card-text').at(2).text()).toEqual("Precio: 15 €")
    })
})

