import React from 'react'
import styleCart from './UserCart.module.css'

export default function UserCart() {
    return (
        <>
            <div className={styleCart.cartPage}>
                <div className={styleCart.cartInfo}>
                    <div className={styleCart.point}>
                        <h5 className={styleCart.pointNum}>my cart</h5>
                        <h5>my point : <span className={styleCart.pointNum}>15</span></h5>
                    </div>
                    <div className={styleCart.allTreeBought}>
                        <div className={styleCart.treeBought}>
                            <h3>tree name</h3>
                            <h3>amount</h3>
                            <h3>date</h3>
                        </div>
                        <div className={styleCart.treeBought}>
                            <h3>tree name</h3>
                            <h3>amount</h3>
                            <h3>date</h3>
                        </div>
                        <div className={styleCart.treeBought}>
                            <h3>tree name</h3>
                            <h3>amount</h3>
                            <h3>date</h3>
                        </div>
                        <div className={styleCart.treeBought}>
                            <h3>tree name</h3>
                            <h3>amount</h3>
                            <h3>date</h3>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
