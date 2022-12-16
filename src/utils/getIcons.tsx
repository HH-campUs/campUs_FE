const mart = "/images/faclIcon/market.svg";
const wifi = "/images/faclIcon/icon-wifi.svg";
const tram = "/images/faclIcon/icon-trampolin.svg";
const sports = "/images/faclIcon/icon-sports.svg";
const plground = "/images/faclIcon/icon-playground.svg";
const hotwater = "/images/faclIcon/icon-hotwater.svg";
const ground = "/images/faclIcon/icon-ground.svg";
const fire = "/images/faclIcon/icon-firewood.svg";
const dog = "/images/faclIcon/icon-dog.svg";
const elec = "/images/faclIcon/icon-plug.svg";
const swimpool = "/images/faclIcon/icon-pool.svg";
const walkway = "/images/faclIcon/icon-walk.svg";

//타입수정필요.
function getIcons(name: string) {
  switch (name) {
    case "전기":
      return <img src={elec} alt="전기" />;
    case "온수":
      return <img src={hotwater} alt="온수" />;
    case "물놀이장":
      return <img src={swimpool} alt="물놀이" />;
    case "산책로":
      return <img src={walkway} alt="산책로" />;
    case "마트.편의점":
      return <img src={mart} alt="마트" />;
    case "무선인터넷":
      return <img src={wifi} alt="무선" />;
    case "장작판매":
      return <img src={fire} alt="장작" />;
    case "트렘폴린":
      return <img src={tram} alt="트램" />;
    case "운동장":
      return <img src={ground} alt="운동장" />;
    case "운동시설":
      return <img src={sports} alt="운동" />;
    case "애견동반":
      return <img src={dog} alt="애견" />;
    case "놀이터":
      return <img src={plground} alt="놀이터" />;

    default:
      return;
  }
}

export default getIcons;
