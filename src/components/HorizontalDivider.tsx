type Props = { className?: string }

function HorizontalDivider({ className }: Props) {
  return (
    <div className={`${className ?? ''} ${className?.includes('bg') ? '' : 'bg-white'} w-0.5 h-auto`}></div>
  )
}

export default HorizontalDivider

