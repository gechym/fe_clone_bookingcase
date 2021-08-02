export const adminMenu = [
    { //hệ thống
        name: 'menu.system.header', menus: [
            
            {
                name: 'menu.admin.crud',link:'/system/user-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.crud-redux',link:'/system/user-redux'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-user',link :"/system/user-admin"
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-doctor',link:'/system/user-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            }
        ]
    },
    { //Quản lý Phòng khám
        name: 'menu.admin.clinic', menus: [
            {
                name:'menu.admin.manage-clinic' , link:'/system/manage-clinic'
            }
        ]
    },
    { //Quản lý 
        name: 'menu.admin.specialties', menus: [
            {
                name:'menu.admin.manage-specialitis' , link:'/system/manage-clinic'
            }
        ]
    },
    { //Quản lý 
        name: 'menu.admin.handbook', menus: [
            {
                name:'menu.admin.manage-handbook' , link:'/system/manage-clinic'
            }
        ]
    },
];