type Props = { className?: string }

function VerticalDivider({ className }: Props) {
  return (
    <div className={`${className ?? ''} ${className?.includes('bg') ? '' : 'bg-white'} w-auto h-0.5`}></div>
  )
}

export default VerticalDivider; 

