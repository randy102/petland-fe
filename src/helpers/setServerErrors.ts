import { ErrorOption } from 'react-hook-form'

export default function setServerErrors<Inputs>(
  errors: {
    [P in keyof Inputs]?: string
  },
  setError: (name: keyof Inputs, error: ErrorOption) => void
) {
  Object.keys(errors).forEach(field => {
    setError(field as keyof Inputs, {
      message: errors[field as keyof Inputs] as string,
      type: 'server'
    })
  })
}
