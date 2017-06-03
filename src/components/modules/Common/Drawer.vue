<template>
        <q-drawer ref="leftDrawer">
            <div class="toolbar light">
                <q-toolbar-title :padding="1">
                    TOOLS
                </q-toolbar-title>
            </div>
            <div class="list no-border platform-delimiter">
                <q-drawer-link icon="alarm" to="/takt">
                    Takt Time
                </q-drawer-link>
                <q-drawer-link icon="trending_up" to="/oee">
                    OEE - Eficiency
                </q-drawer-link>
                <q-drawer-link icon="insert_chart" to="/obc">
                    Operator Balance Chart
                </q-drawer-link>
            </div>
        </q-drawer>
</template>

<style lang="stylus">
    
</style>
