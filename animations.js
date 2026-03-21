// Plug-and-Play Animations Module

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Animated Number Counters
    const startCounters = () => {
        const statsNumbers = document.querySelectorAll('.stats-number');
        
        statsNumbers.forEach(stat => {
            // Find if it has a number. In this portfolio, the "4" is bare inside the div.
            // Other boxes have "BCA", etc. We only want to animate numbers.
            const textContent = stat.childNodes[0].nodeValue ? stat.childNodes[0].nodeValue.trim() : '';
            if (textContent) {
                const number = parseInt(textContent, 10);
                
                if (!isNaN(number)) {
                    animateValue(stat.childNodes[0], 0, number, 1500);
                }
            }
        });
    }

    function animateValue(textNode, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuart
            const easeOutProgress = 1 - Math.pow(1 - progress, 4); 
            const current = Math.floor(easeOutProgress * (end - start) + start);
            textNode.nodeValue = current;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                textNode.nodeValue = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Start counters slightly after the staggered entrance finishes
    setTimeout(startCounters, 500);
});
