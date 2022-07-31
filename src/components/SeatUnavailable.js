export default function SeatUnavailable (setVisibility) {

    setVisibility('visible');

    setTimeout(() => {
        setVisibility('invisible');
    }, 2000);
}