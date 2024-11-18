// login.spec.ts
import { mount } from '@vue/test-utils'
import Login from './../../src/views/Login.vue'
import { useRouter } from 'vue-router'
import { createStore } from 'vuex'

jest.mock('vue-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

// Mock du store Vuex pour simuler les mutations d’authentification
const store = createStore({
  mutations: {
    setUser: jest.fn(),
    setToken: jest.fn(),
    createToken: jest.fn(),
  },
})

describe('Login.vue', () => {
  it('affiche une erreur lorsque les champs sont vides', async () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [store],
      },
    })
    const loginButton = wrapper.find('.w-full')

    await loginButton.trigger('click')

    const errorMessages = wrapper.findAll('.text-red-600 p')
    expect(errorMessages.length).toBeGreaterThan(0)
    expect(errorMessages[0].text()).toBe('Le champ pseudo est obligatoire !')
    expect(errorMessages[1].text()).toBe('Le champ mot de passe est obligatoire !')
  })

  it('affiche une erreur pour une connexion échouée', async () => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(null, { status: 401, statusText: 'Unauthorized' })
      )
    )

    const wrapper = mount(Login, {
      global: {
        plugins: [store],
      },
    })

    await wrapper.find('input[type="text"]').setValue('wronguser')
    await wrapper.find('input[type="password"]').setValue('wrongpass')
    await wrapper.find('button').trigger('click')

    const errorMessages = wrapper.findAll('.text-red-600 p')
    expect(errorMessages.length).toBe(1)
    expect(errorMessages[0].text()).toBe('Email ou mot de passe invalides !')
  })

  it('redirige vers /voyage en cas de connexion réussie', async () => {
    const mockRouter = useRouter()
    globalThis.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({ token: 'mocked.token.value' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
      )
    )

    const wrapper = mount(Login, {
      global: {
        plugins: [store],
      },
    })

    await wrapper.find('input[type="text"]').setValue('testuser')
    await wrapper.find('input[type="password"]').setValue('testpass')
    await wrapper.find('button').trigger('click')

    expect(mockRouter.push).toHaveBeenCalledWith('/voyage')
  })
})
