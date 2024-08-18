import { useEffect } from "react";
import UseAxiosPublic from "./UseAxiosPublic";

export const ImpressionCounter = (id) => {
    const axiosPublic = UseAxiosPublic();

    useEffect(() => {
        const observing = document.getElementById(id);
        if (observing) {
            const observer = new IntersectionObserver(entries => {
                entries?.forEach(async (entry) => {
                    if (entry?.isIntersecting === true) {
                        console.log(id);
                       const res=  await axiosPublic.patch(`/api/v1/impressionCount/?id=${id}`)
                        const data = res?.data;
                        console.log(data);

                    }
                })
            })
            observer?.observe(observing)
            return ()=>{
                observer?.disconnect()
            }
        }
    }, [id, axiosPublic])
};
