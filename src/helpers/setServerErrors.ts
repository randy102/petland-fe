import { ErrorOption } from 'react-hook-form'

type Props<Inputs> = {
  errors?: {
    [P in keyof Inputs]?: string
  }
  setError: (name: keyof Inputs, error: ErrorOption) => void
  fields: string[]
}

export default function setServerErrors<Inputs>(props: Props<Inputs>) {
  const { errors, setError, fields } = props

  if (!errors) return

  const hasFieldError = Object.keys(errors).some(key => fields.includes(key))

  if (hasFieldError) {
    Object.keys(errors).forEach(field => {
      setError(field as keyof Inputs, {
        message: errors[field as keyof Inputs] as string,
        type: 'server'
      })
    })
  }
}
