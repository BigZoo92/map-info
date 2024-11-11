import './styles.scss'

const Tooltip = ({
  tooltipRef,
}: {
  tooltipRef: React.RefObject<HTMLDivElement>
}) => {
  return <div className="tooltip" ref={tooltipRef}></div>
}

export default Tooltip
