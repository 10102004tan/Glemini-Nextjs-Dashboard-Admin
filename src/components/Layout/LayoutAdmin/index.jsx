import SideMenu from "../SideMenu";

export default function LayoutAdmin({ children }) {
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <SideMenu />
            </div>
            <div className="col-span-10">
                {children}
            </div>
        </div>
    )
}