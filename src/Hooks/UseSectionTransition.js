import { useEffect } from 'react';
import './UseSectionTransition.css'

export const UseSectionTransition = (id, from, isPlus) => {


    useEffect(() => {
        if (id) {
            // console.log(from);
            const section = document.getElementById(id)
            if (section) {
                const observer = new IntersectionObserver(entries => {

                    entries?.forEach(element => {
                        if (element?.isIntersecting === true) {
                            // console.log('true paici re');
                            section.style.opacity = '1';
                            section.style.transform = `${from}(0)`;
                        }
                        else {
                            
                            section.style.opacity = '.1';
                            
                        }
                    });
                })
                observer?.observe(section)
            }
            else {
                section.style.opacity = '1';
                section.style.transform = `${from}(0)`;
            }
        }
    }, [id, from, isPlus])


};
