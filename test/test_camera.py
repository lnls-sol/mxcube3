#!/usr/bin/env python

#vim /opt/mxcube3/mxcube.log

import os, sys
from HardwareRepository import HardwareRepository as hwr

# Path to custom ho classes
fname = '/opt/mxcube3/mxcube3/HardwareRepository/'
hwr.addHardwareObjectsDirs([os.path.join(fname, 'HardwareObjects')])

#from mxcube3 import server

# Path to xmls
my_hwr = hwr.HardwareRepository('/opt/mxcube3/test/HardwareObjectsMockup.xml/')
my_hwr.connect()
print('my_hwr = ' + str(my_hwr))

print('qt')
from PyQt4.QtGui import QApplication
app = QApplication([])
print('qt ok')

# Load camera ho by xml
print('Loading camera ho')
my_hwr.getHardwareObject('md_camera')
print('Loaded camera ho')

# To make "from HardwareRepository import ..." possible
#fname = os.path.join('.', 'mxcube3')
#sys.path.insert(0, fname)

## Beamline
#from HardwareRepository import HardwareRepository as hwr
from mxcube3 import blcontrol

#hwr_xml_dir = os.path.join('/opt/mxcube3/test/', 'HardwareObjects.xml/')
#blcontrol.init(hwr)

#blcontrol.get_hwo('beamline-setup')
