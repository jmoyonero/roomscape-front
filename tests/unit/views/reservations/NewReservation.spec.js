import {createLocalVue, shallowMount} from '@vue/test-utils'
import NewReservation from "@/views/reservations/NewReservation";
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';

const localVue = createLocalVue();
localVue.use(BootstrapVue);

jest.mock('axios');

let reservations = {
    "data": [{
        "id": 33,
        "participantes": 1,
        "precio": 25.0,
        "duracion": 30,
        "activo": true,
        "nombreEscapeRoom": "Contrarreloj",
        "fechaIni": "24/05/2021 09:00",
        "fechaFin": "24/05/2021 09:30"
    }, {
        "id": 34,
        "participantes": 1,
        "precio": 25.0,
        "duracion": 30,
        "activo": true,
        "nombreEscapeRoom": "Contrarreloj",
        "fechaIni": "24/05/2021 14:00",
        "fechaFin": "24/05/2021 14:30"
    }, {
        "id": 35,
        "participantes": 1,
        "precio": 25.0,
        "duracion": 30,
        "activo": true,
        "nombreEscapeRoom": "Contrarreloj",
        "fechaIni": "24/05/2021 14:30",
        "fechaFin": "24/05/2021 15:00"
    }]
}

let escapeRoom = {
    "data": {
        "id": 6,
        "activo": true,
        "capacidadPersonas": 2,
        "duracion": 30,
        "nombre": "Contrarreloj",
        "precio": 25.0
    }
}

describe('Pruebas unitarias Alta Reserva', () => {

    axios.get.mockImplementation((url) => {
        switch (url) {
            case 'https://backend-dev.roomscape.es/reservation/list?escapeRoomId=1':
                return Promise.resolve(reservations)
            case 'https://backend-dev.roomscape.es/escape-room/1':
                return Promise.resolve(escapeRoom)
            default:
                return Promise.reject(new Error('not found'))
        }
    })

    const $route = {
        path: '/reservas/alta/1',
        params: {id: 1}
    }
    const $cookies = {
        get: function () {
            return "session_id"
        },
    }

    let wrapper = shallowMount(NewReservation, {
        localVue,
        mocks: {
            $route,
            $cookies
        }
    })

    it('Validación del mensaje a mostrar cuando la lista de escape rooms es vacía', async () => {

        expect(wrapper.find('.new_reservation_title').text()).toEqual("Reserva de Contrarreloj")

        expect(wrapper.find('#input-group-duration').props().label).toEqual('Duración:')
        expect(wrapper.find('#input-duration').props().value).toEqual('30 minutos')
        expect(wrapper.find('#input-duration').props().disabled).toEqual(true)

        expect(wrapper.find('#input-group-price').props().label).toEqual('Precio:')
        expect(wrapper.find('#input-price').props().value).toEqual('25 €')
        expect(wrapper.find('#input-price').props().disabled).toEqual(true)

        expect(wrapper.find('#input-group-capacity').props().label).toEqual('Capacidad de personas:')
        expect(wrapper.find('#input-group-capacity').props().description).toEqual('La capacidad máxima es: 2')
        expect(wrapper.find('#input-capacity').props().value).toEqual('')
        expect(wrapper.find('#input-capacity').props().max).toEqual(2)
        expect(wrapper.find('#input-capacity').props().min).toEqual("1")
        expect(wrapper.find('#input-capacity').props().disabled).toEqual(false)

        expect(wrapper.find('#input-group-date').props().label).toEqual('Elige la fecha:')
        expect(wrapper.find('#datepicker-start-date').props().disabled).toEqual(false)

        expect(wrapper.find('#input-group-time').props().label).toEqual('Elige la hora:')
        expect(wrapper.find('#select-time').props().disabled).toEqual(true)

        expect(wrapper.find('#success_button').text()).toEqual('Reservar')

        expect(wrapper.find('#cancel_button').text()).toEqual('Cancelar')
    })
})