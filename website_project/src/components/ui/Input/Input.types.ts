import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

export interface BaseInputProps {
  label?: string
  error?: string
  helperText?: string
  className?: string
  required?: boolean
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {
  variant?: 'default' | 'filled'
  size?: 'sm' | 'md' | 'lg'
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {
  variant?: 'default' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  resize?: boolean
}