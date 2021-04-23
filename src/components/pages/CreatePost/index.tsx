import { Step, StepButton, StepLabel, Stepper } from '@material-ui/core'
import { Label } from '@material-ui/icons'
import { useState } from 'react'

const steps = ['Thông tin thú cưng', 'Thông tin liên lạc', 'Đăng tin']

export default function CreatePost() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const [completed, setCompleted] = useState<{ [index: number]: boolean }>({
    0: false,
    1: false
  })

  const handleStepClick = (index: number) => {
    setActiveStep(index)
  }

  return (
    <div>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
      >
        {
          steps.map((label, index) => (
            <Step key={label}>
              {
                completed[index]
                  ? (
                    <StepButton onClick={() => handleStepClick(index)}>{label}</StepButton>
                  ) : (
                    <StepLabel>{label}</StepLabel>
                  )
              }
            </Step>
          )) 
        }
      </Stepper>
    </div>
  )
}
