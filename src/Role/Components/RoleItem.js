import React from 'react'
import { connect } from 'react-redux';
import Tippy from '@tippyjs/react';

const RoleItem = ({
    id = "",
    index = 0,
    role,
    ...props
}) => {

    if (!role) {
        return <></>;
    }

    const onEdit = (e) => {
        props.history?.push(`/app/role/${id}`);
    }

    const onToggle = (e) => {
        props.toggleRole && props.toggleRole(true, id);
    }

    return (
        <tr key={index}>
             <td style={{ textAlign: "center", width: "70px"  }}>{index + 1}</td>

             <td>{role?.name}</td>

            <td className={
                role?.active
                ? "greenColor"
                : "redColor"
            } style={{ width: "140px" }}>
                {role?.active ? "Active" : "Deactive"}
            </td>

            <td style={{textAlign:'center', width: "140px" }}>
                <span
                    onClick={onEdit}
                >
                    <Tippy content="Edit">
                        <i className="bx bxs-pencil" />
                        </Tippy>
                </span>

                <span
                    className='ml-2'
                    onClick={onToggle}
                ><Tippy content={role?.active ? "Deactivate" : "Activate"}>
                    {
                        role?.active
                        ? <i className="fas fa-user greenColor"></i>
                        : <i className="fas fa-user-slash"></i>
                    }
                    {/* <i className="dripicons dripicons-cross" /> */}
                    </Tippy>
                </span>
            </td>
        </tr>
    );
}

const mapStateToProps = (state, ownProps) => {
    let { id } = ownProps;
    let role = id && state.role.roles[id];

    return {
        role: role,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleItem);