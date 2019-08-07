#!/usr/bin/env python

import os, sys
from HardwareRepository import HardwareRepository as hwr

# Path to custom ho classes
fname = '/opt/mxcube3/mxcube3/HardwareRepository/'
hwr.addHardwareObjectsDirs([os.path.join(fname, 'HardwareObjects')])

# Path to xmls
my_hwr = hwr.HardwareRepository('/opt/mxcube3/test/HardwareObjectsMockup.xml/')
my_hwr.connect()

ho_current = my_hwr.getHardwareObject('mach-info')
print('ho_current = ' + str(ho_current.getCurrent()))
