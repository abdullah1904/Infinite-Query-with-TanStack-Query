import React from 'react'
import { useInView } from 'react-intersection-observer'

type Props = {
    children: React.ReactNode
    onBottomReached: () => void
    className?: string
}

const InfiniteScrollContainer = ({ children, onBottomReached, className }: Props) => {
    const { ref } = useInView({
        rootMargin: "50px",
        onChange: (inView) => {
            if (inView) {
                onBottomReached();
            }
        }
    });
    return (
        <div className={className}>
            {children}
            <div ref={ref} />
        </div>
    )
}

export default InfiniteScrollContainer