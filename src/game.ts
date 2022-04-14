import { Dash_OnUpdateFrame, Dash_Wait } from "dcldash";
import { Coin } from "./coin";

interface ICoinCreationData {
  timer: number
  spawnTime: number
  coins: Coin[]
  maxCoins: number
  decay: number
}

const coinCreationData: ICoinCreationData = {
  timer: 0,
  spawnTime: 5,
  coins: [],
  maxCoins: 10,
  decay: 3,
}

const createCoin = (data: any, dt: number) => {
  const { coins, spawnTime, maxCoins, decay } = coinCreationData
  coinCreationData.timer+=dt
  if(coinCreationData.timer >= spawnTime){

      const coin = new Coin(new Vector3(
        Scalar.RandomRange(1, 15),
        Scalar.RandomRange(2, 5),
        Scalar.RandomRange(1, 15),
      ))
      coins.push(coin)
      coinCreationData.timer = 0

      Dash_Wait(() => {
        coin.hide()
      }, coinCreationData.decay)
 
  }
}
const createCoinEntity = Dash_OnUpdateFrame.add(createCoin, coinCreationData)

createCoinEntity.start()


