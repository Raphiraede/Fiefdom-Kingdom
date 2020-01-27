import React from 'react'
import './Tutorial.css'
import BasicKingdomsPicture from '../../images/Tutorial/BasicTwoKingdoms.PNG'
import KingdomSection from '../../images/Tutorial/KingdomSectionWithFamilies.PNG'
import ArmyDemonstration from '../../images/Tutorial/ArmyDemonstration.PNG'
function Tutorial(){
  return(
    <div className='TutorialWrapper'>
      <div className='Tutorial'>
        <h1>
          Welcome To Fiefdom Kingdom!
        </h1>
        <p>
          Fiefdom Kingdom is a feudal kingdom management game where you must expand your kingdom and conquer your neighbors!
        </p>

        <div className='ImageParagraphCombo'>
          <img className='BasicKingdomsPicture'
            src={BasicKingdomsPicture}
            alt=''
          />
          <p>
            Your kingdoms territory is represented by the blue borders, with the enemy kingdom represented with red borders.
            <br /> <br />
            The ultimate objective is to capture the enemy castle while protecting your own.
          </p>
        </div>

        <div className='ImageParagraphCombo'>
          <img className='BasicKingdomsPicture'
            src={KingdomSection}
            alt=''
          />
          <p>
            This is the Kingdom Management Section. This shows basic information about your game, like Gold, Turn Number, and Families
            <br /> <br />
            Click The Families Button to see the Families menu, which shows the families that are loyal to your kingdom.
            Each Noble has different attributes, such as Age and Tax level.
            <br /> <br />
            It is incredibly important to keep your Nobles happy by giving them land, or they might split from the Kingdom. Without your nobles, you can't run your kingdom.
            <br /> <br />
            When a Noble get too old, he will die and his son will take his place. The son may have slightly different stats from the Nobles, so take care to always moniter the stats of the Nobles controlling your land.
            <br /> <br />
            Click the Give Fief button to award fiefs of land to that Noble, then press commit to stop giving Fiefs. This will allow the noble to collect taxes and raise armies from the land.
            Tax revenue is calculated based on the Noble's tax level and the population of the tiles under that Noble.
            <br /> <bra />
            Click the Raise Army button to raise an Army from the Nobles Land. This will levee 10% of the population under that noble into an Army.
          </p>
        </div>

        <div className='ImageParagraphCombo'>
          <img className='BasicKingdomsPicture'
            src={ArmyDemonstration}
            alt=''
          />
          <p>
            Armies always spawn next to your castle. Once an army is raised, it will need to be paid every turn, based on the size of the Army.
            Be cautious not to raise too large of an army, as it will quickly drain your Treasury and you will go bankrupt.
            The Castle tile holds 500 population at the beginning of the game, so it is probably wise not to raise an army from a noble controlling the castle.
            If you ever go over 1000 gold into debt, your kingdom will collapse and you will lose the game.
            <br /> <br />
            Left click an Army to select it. Right click a tile to command the Army to move to that tile.
            If an army is on a tile for 3 turns, it will conquer that tile and that tile will enter your kingdom.
            <br /> <br />
            An army can be put into move mode or conquer mode. If in move mode, the army will move towards its destination as fast as possible.
            If in conquer mode, the army will conquer every tile between it and it's destination.
            If two armies from opposing kingdoms collide, they will enter battle.
            <br /> <br />

            Click the disband button to disband the Army. The men in the army will return to the tiles from which they were leveed, where they can be taxed again.
          </p>
        </div>


      </div>
    </div>
  )
}

export { Tutorial }